package com.wirebuyer.chattools.tobraille;

import com.wirebuyer.chattools.security.User;
import com.wirebuyer.chattools.security.UserRepository;
import org.imgscalr.Scalr;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ImageToBrailleService {

    private final UserRepository userRepository;
    private final AsciiRepository asciiRepository;

    public ImageToBrailleService(AsciiRepository asciiRepository, UserRepository userRepository) {
        this.asciiRepository = asciiRepository;
        this.userRepository = userRepository;
    }


    /* TODO:
        - add custom exception here for image in case it is invalid. use the correct status code with description
        potentially add ability to make a request and retrieve an image from an external source.
        - add dithering options
     */
    public String convertImage(MultipartFile user_image, BrailleOptions brailleOptions, OidcUser principal) {
        BufferedImage img;
      /*  TODO:
            - add a check to see if image is null. see how to throw it and provide a meaningful error
            - currently does not support webp for example so it shows up as null. learn more
       */
        if (brailleOptions.isSave() && principal == null) {
            throw new AuthenticationCredentialsNotFoundException("Not logged in");
        }

        try {
            img = ImageIO.read(user_image.getInputStream());
        } catch (IOException e) {
            System.out.println("ERROR READING IMAGE");
            throw new RuntimeException(e);
        }

        img =  resize(img, brailleOptions);
        to_grayscale(img);

        String res = to_braille(img, brailleOptions);

        // since we checked for auth status before even reading the image this will work here without checking again
        if (brailleOptions.isSave()) {
            User user = userRepository.findByProviderId(principal.getSubject()).get();

            long count = asciiRepository.countByUser(user);
            if (count > 30) {
                throw new IllegalStateException("Too many saved (limit: 30)");
            }

            try {
                Ascii ascii = new Ascii();
                ascii.setContent(res);
                ascii.setUser(user);
                asciiRepository.save(ascii);
            } catch (DataIntegrityViolationException e) {
                throw new IllegalStateException("Ascii already exists!");
            }
        }

        return res;
    }

    public Page<AsciiDto> getAscii(String subject, Pageable pageable) {
        User user = userRepository.findByProviderId(subject).get();
        return asciiRepository.findByUser(user, pageable).map(AsciiDto::toDto);
    }

    @Transactional
    public void deleteAsciis(String subject, List<UUID> ids) {
        User user = userRepository.findByProviderId(subject).get();
        asciiRepository.deleteByUserAndIdIn(user, ids);
    }


    /* TODO:
        make this function do the resizing and pad checking in 1 go instead of 2. Calculate the dimensions in the
        if else checks then check for padding, then call drawImage after adjusting the canvas with the padding
     */
    private BufferedImage resize(BufferedImage image, BrailleOptions brailleOptions) {
        // set a default width if nothing was given by the user
        if (brailleOptions.getHeight() == null && brailleOptions.getWidth() == null) {
            brailleOptions.setWidth(60);
        }
        if (brailleOptions.getHeight() == null) {
            image = Scalr.resize(image, Scalr.Mode.FIT_TO_WIDTH, brailleOptions.getWidth());
        } else if (brailleOptions.getWidth() == null) {
            image = Scalr.resize(image, Scalr.Mode.FIT_TO_HEIGHT, brailleOptions.getHeight());
        } else {
            image = Scalr.resize(image, Scalr.Mode.FIT_EXACT, brailleOptions.getWidth(), brailleOptions.getHeight());
        }

        // check padding and add if needed
        if (image.getWidth() % 2 != 0 || image.getHeight() % 4 != 0) {
            int padded_width = (image.getWidth() % 2 != 0) ? 1 : 0;
            int padded_height = (image.getHeight() % 4 != 0) ? (4 - image.getHeight() % 4) : 0;

            BufferedImage padded_image = new BufferedImage(image.getWidth() + padded_width, image.getHeight() + padded_height, image.getType());
            Graphics2D g = padded_image.createGraphics();
            // pad with different coloured backgrounds to make it not set a dot
            g.setColor((brailleOptions.isInverted()) ? Color.BLACK : Color.WHITE);
            g.fillRect(0, 0, image.getWidth() + padded_width, image.getHeight() + padded_height);
            padded_image.getGraphics().drawImage(image, 0, 0, null);
            g.dispose();

            image = padded_image;
        }
        return image;
    }

    private static void to_grayscale(BufferedImage image) {
        int height = image.getHeight();
        int width = image.getWidth();

        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                Color c = new Color(image.getRGB(j, i));
                int red = (int) (c.getRed() * 0.299);
                int green = (int) (c.getGreen() * 0.587);
                int blue = (int) (c.getBlue() * 0.114);
                Color grayscale_pixel = new Color(red + green + blue,
                        red + green + blue,
                        red + green + blue);

                image.setRGB(j, i, grayscale_pixel.getRGB());
            }
        }
    }

    private static String to_braille(BufferedImage image, BrailleOptions brailleOptions) {
        // offset for each char in the braille block. Add all offsets then convert to a char to get its shape
        final int[][] BRAILLE_DOT_OFFSETS = {
                {0x1, 0x8},
                {0x2, 0x10},
                {0x4, 0x20},
                {0x40, 0x80}
        };
        final int BRAILLE_CHARS_START = 0x2800;

        StringBuilder braille_string = new StringBuilder();

        // loop over the image in blocks
        for (int imgY = 0; imgY < image.getHeight(); imgY += 4) {
            for (int imgX = 0; imgX < image.getWidth(); imgX += 2) {
                // loop over the blocks themselves
                int offset = 0x0;
                for (int y1 = 0; y1 < 4; y1++) {
                    for (int x1 = 0; x1 < 2; x1++) {
                        int colour_value = image.getRGB(imgX + x1, imgY + y1) & 0xFF;
                        if (brailleOptions.isInverted() && colour_value > brailleOptions.getThreshold()) {
                            offset += BRAILLE_DOT_OFFSETS[y1][x1];
                        } else if (!brailleOptions.isInverted() && colour_value < brailleOptions.getThreshold()) {
                            offset += BRAILLE_DOT_OFFSETS[y1][x1];
                        }
                    }
                }
                offset += (offset == 0x0) ? 0x4 : 0x0;
                braille_string.append((char) (BRAILLE_CHARS_START + offset));
            }
            braille_string.append("\n");
        }
        return braille_string.toString();
    }
}

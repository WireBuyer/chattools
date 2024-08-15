import { Group, Image, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";

function ImageArea({ setImage, image, error }) {
  const [imagePreview, setimagePreview] = useState(null);


  const handleDrop = (file) => {
    setimagePreview(URL.createObjectURL(file[0]));
    setImage(file[0]);
  };
  return (
    <>
      <Dropzone
      style={{
        borderColor: error ? 'red' : undefined,
          borderWidth: error ? '2px' : undefined,
          borderStyle: error ? 'solid' : undefined,
      }}
      mt="md"
        onDrop={handleDrop}
        accept={IMAGE_MIME_TYPE}
        maxFiles={1}
        maxSize={10 * 1024 * 1024} // 10MB
      >
        <Group justify="center" mih={100} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload size="3.2rem" stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX size="3.2rem" stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size="5.2rem" stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag image here or click to select
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Attach a single image (PNG, JPG, WebP, or GIF) up to 10MB
            </Text>
          </div>
        </Group>
      </Dropzone>

      {imagePreview && (
        <Image
        onClick={() => console.log("image prview clicked")}
          src={imagePreview}
          alt="Preview"
          width={250}
          height={250}
          fit="contain"
          mt="md"
        />
      )}
    </>
  );
}

export default ImageArea
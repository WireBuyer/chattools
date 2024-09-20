import {
  Button,
  Fieldset,
  Grid,
  Group,
  NumberInput,
  Radio,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import ImageDropzone from '../../components/ImageDropzone';
import classes from "../Form.module.css";

function CropForm() {
  const [image, setImage] = useState(null);
  const [tileStatus, setTileStatus] = useState("Select an image");
  const [isCroppable, setIsCroppable] = useState(false);

  const form = useForm({
    initialValues: {
      rows: 2,
      cols: 2,
      isTrim: true,
      isDownsize: true,
      enable: false, // possibly deleting this later
    },
    validate: {
      rows: (value, values) =>
        value === 1 && values.cols === 1
          ? 'Either rows or columns must be greater than 1'
          : null,
      cols: (value, values) =>
        value === 1 && values.rows === 1
          ? 'Either rows or columns must be greater than 1'
          : null,
    },
    validateInputOnChange: true,
  });

  useEffect(() => {
    form.validate();
  }, [form.values.rows, form.values.cols]);

  const handleTileStatus = () => {
    if (!image) return;

    const img = new Image();
    const url = URL.createObjectURL(image)
    img.onload = () => {
      const { width, height } = img;
      const { rows, cols } = form.values;
      let hasExcessPixels = false;
      let msg = "";

      if (width % cols != 0 && height % rows != 0) {
        msg = `Height and width not evenly divisible (${width % cols} and ${height % rows} excess  pixel(s)). Select a method to handle remaining pixels.`
        hasExcessPixels = true;
      } else if (width % cols != 0) {
        msg = `Width not evenly divisible (${width % cols} excess pixel(s)). Select a method to handle remaining pixels.`
        hasExcessPixels = true;
      } else if (height % rows != 0) {
        msg = `Height not evenly divisible (${height % rows} excess  pixel(s)). Select a method to handle remaining pixels.`
        hasExcessPixels = true;
      } else {
        msg = "Tiles evenly divisible";
      }
      setIsCroppable(hasExcessPixels);
      setTileStatus(msg);

      URL.revokeObjectURL(url);
    }
    img.src = url;
  };

  useEffect(() => {
    if (image) {
      handleTileStatus();
    }
  }, [form.values.rows, form.values.cols, image]);

  const handleSubmit = (values) => {
    if (values.rows === 1 && values.cols === 1) {
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "cropOptions",
      new Blob([JSON.stringify(values)], {
        type: "application/json",
      })
    );

    // TODO: add notification for error
    let filename = "";
    fetch('/api/squareify', {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          const header = response.headers.get('Content-Disposition');
          const parts = header.split(';');
          filename = parts[1].split('=')[1];
          return response.blob();
        }
        throw new Error("not ok!");
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Stack style={{ width: "75%", marginTop: "10px", marginBottom: "20px" }}>
      <Fieldset>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid >
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput
                label="Rows"
                {...form.getInputProps('rows')}
                min={1}
                max={7}
                errorProps={{ ml: 5 }}
                className={classes.inputWrapper}
                classNames={{
                  root: classes.root,
                  label: classes.label,
                  input: classes.input,
                }}
                style={{ minHeight: '45px' }}
              />
              <NumberInput
                label="Columns"
                {...form.getInputProps('cols')}
                min={1}
                max={7}
                errorProps={{ ml: 5 }}
                className={classes.inputWrapper}
                classNames={{
                  root: classes.root,
                  label: classes.label,
                  input: classes.input,
                }}
                style={{ minHeight: '45px' }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 3 }}>
              {isCroppable && (
                <>
                  <Radio.Group
                    label="Crop method"
                    {...form.getInputProps('isTrim')}
                    defaultValue="trim"
                    value={form.values.isTrim ? 'trim' : 'resize'}
                    onChange={(value) => form.setFieldValue('isTrim', value === 'trim')}
                  >
                    <Group mt="xs">
                      <Radio value="trim" label="Trim" />
                      <Radio value="resize" label="Resize" />
                    </Group>
                  </Radio.Group>

                  {!form.values.isTrim && (
                    <Radio.Group
                      label="Resize Direction"
                      mt={5}
                      {...form.getInputProps('resizeDown')}
                      defaultValue="downsize"
                      value={form.values.isDownsize ? 'downsize' : 'upsize'}
                      onChange={(value) => form.setFieldValue('isDownsize', value === 'downsize')}
                    >
                      <Group mt="xs">
                        <Radio value="downsize" label="Downsize" />
                        <Radio value="upsize" label="Upsize" />
                      </Group>
                    </Radio.Group>
                  )}
                </>)}
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 3 }}>
              {/* <div className={classes.checkboxWrapper}>
                <Checkbox
                  label="Enable?"
                  {...form.getInputProps('enable', { type: 'checkbox' })}
                />
              </div> */}
            </Grid.Col>
          </Grid>
          <Text mt={5}>{tileStatus}</Text>
          <ImageDropzone setImage={setImage} />
          <Button
            type="submit"
            mt="md"
            disabled={form.values.rows === 1 && form.values.cols === 1 || image == null}
          >
            Submit
          </Button>
        </form>
      </Fieldset>
    </Stack>
  );
}

export default CropForm;
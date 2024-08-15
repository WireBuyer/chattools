import { Stack, Button, Fieldset, Checkbox, NumberInput } from "@mantine/core";
import classes from "./BrailleForm.module.css";
import { useState } from "react";
import ImageArea from "./ImageArea";

// @ts-ignore
function BrailleForm({ setAsciiText }) {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [threshold, setThreshold] = useState("");
  const [inverted, setInverted] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleSubmit = () => {
    if (!image) {
      setImageError(true);
      return;
    }

    const formData = new FormData();
    const brailleOptions = {
      width: width === "" ? null : width,
      height: height === "" ? null : height,
      threshold: threshold === "" ? null : threshold,
      inverted: inverted,
    };
    formData.append("user_image", image);
    formData.append(
      "brailleOptions",
      new Blob([JSON.stringify(brailleOptions)], {
        type: "application/json",
      })
    );
    console.log(brailleOptions)

    fetch('/api/brailleConverter', {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if (response.ok) {
          console.log("ok!")
          return response.text();
        }
        throw new Error("error!!!");
      })
      .then((data) => {
        setAsciiText(data);
        setImageError(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setImageError(true);
      });
  };

  return (
    <Stack
      justify="space-between"
      h="100%"
    >
      <Fieldset variant="unstyled">
        <NumberInput
          label="Width"
          placeholder="2-650, blank for default"
          mt="md"
          min={2}
          max={650}
          step={2}
          stepHoldDelay={500}
          stepHoldInterval={100}
          value={width}
          // @ts-ignore
          onChange={setWidth}
          onBlur={() =>
            // @ts-ignore
            width === "" ? setWidth("") : setWidth(Math.round(width / 2) * 2)
          }
          allowDecimal={false}
          classNames={{
            root: classes.root,
            label: classes.label,
            input: classes.input,
          }}
        />

        <NumberInput
          label="Height"
          placeholder="2-650, blank for default"
          mt="md"
          min={2}
          max={650}
          step={2}
          stepHoldDelay={500}
          stepHoldInterval={100}
          value={height}
          // @ts-ignore
          onChange={setHeight}
          onBlur={() =>
            // @ts-ignore
            height === "" ? setHeight("") : setHeight(Math.round(height / 2) * 2)
          }
          allowDecimal={false}
          classNames={{
            root: classes.root,
            label: classes.label,
            input: classes.input,
          }}
        />

        <NumberInput
          label="Threshold"
          placeholder="0-255, blank for default"
          mt="md"
          min={0}
          max={255}
          stepHoldDelay={500}
          stepHoldInterval={100}
          value={threshold}
          // @ts-ignore
          onChange={setThreshold}
          onBlur={() =>
            threshold === "" ? setThreshold("") : setThreshold(threshold)
          }
          allowDecimal={false}
          classNames={{
            root: classes.root,
            label: classes.label,
            input: classes.input,
          }}
        />
        <Checkbox
          mt="md"
          labelPosition="left"
          label="Invert"
          checked={inverted}
          onChange={(event) => setInverted(event.currentTarget.checked)}
          classNames={{
            label: classes.label,
          }}
        />
        <ImageArea setImage={setImage} image={image} error={imageError} />
      </Fieldset>
      <Button onClick={handleSubmit}>Submit</Button>
      
    </Stack>
  );
}

export default BrailleForm;

import { Button, Center } from '@mantine/core';

function Page2() {
  const handleClick = () => {
    console.log('clicked!');
  };

  return (
    <Center style={{ height: '100%' }}>
      <Button onClick={handleClick}>Click me!</Button>
    </Center>
  );
}

export default Page2;
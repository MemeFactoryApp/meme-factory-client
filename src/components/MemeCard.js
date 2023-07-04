import { Button, Card, Grid, Group, Image, Text } from "@mantine/core";

function MemeCard(props) {
  return (
    <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={props.url} max-height={400} alt="meme" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{props.title}</Text>
          </Group>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Delete Meme
          </Button>
        </Card>
    </Grid.Col>
  );
}

export default MemeCard;

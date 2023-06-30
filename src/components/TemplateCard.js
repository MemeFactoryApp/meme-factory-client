import { Link } from "react-router-dom";
import CreateMeme from "../pages/CreateMeme";
import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";

function TemplateCard(props) {
  return (
    <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
      <Link to={`/templates/${props.id}`} element={<CreateMeme />}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={props.example.url} max-height={400} alt="meme" />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{props.name}</Text>
          </Group>

          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Use template
          </Button>
        </Card>
      </Link>
    </Grid.Col>
  );
}

export default TemplateCard;

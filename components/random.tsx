import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import foodList from '@food';

const Random = () => {
  const randomFood =
    foodList.food[Math.floor(Math.random() * foodList.food.length)];
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {randomFood.name}
            </Typography>
            <Typography>Size: {randomFood.size}</Typography>
            <Typography>
              Deliverable: {randomFood.deliverable ? 'Yes' : 'No'}
            </Typography>
            <Typography>Effort: {randomFood.effort}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Random;

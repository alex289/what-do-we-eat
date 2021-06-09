import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import foodList from '@food';

const Food = () => (
  <Grid container spacing={3}>
    {foodList.food.map((food, index) => (
      <Grid key={index} item xs={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {food.name}
            </Typography>
            <Typography>Size: {food.size}</Typography>
            <Typography>
              Deliverable: {food.deliverable ? 'Yes' : 'No'}
            </Typography>
            <Typography>Effort: {food.effort}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Food;

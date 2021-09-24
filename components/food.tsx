import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('@material-ui/core/Grid'));
const Card = dynamic(() => import('@material-ui/core/Card'));
const CardContent = dynamic(() => import('@material-ui/core/CardContent'));
const Typography = dynamic(() => import('@material-ui/core/Typography'));

import foodList from '@food';

const Food = () => (
  <Grid container spacing={3}>
    {foodList.food.map((food, index) => (
      <Grid key={index} item xs={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">{food.name}</Typography>
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

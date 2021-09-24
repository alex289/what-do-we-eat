import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('@material-ui/core/Grid'));
const Card = dynamic(() => import('@material-ui/core/Card'));
const CardContent = dynamic(() => import('@material-ui/core/CardContent'));
const Typography = dynamic(() => import('@material-ui/core/Typography'));

import foodList from '@food';

const Random = () => {
  const randomFood =
    foodList.food[Math.floor(Math.random() * foodList.food.length)];
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5">{randomFood.name}</Typography>
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

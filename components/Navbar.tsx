import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">What do we eat?</Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;

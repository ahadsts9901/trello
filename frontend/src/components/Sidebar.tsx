import Drawer from '@mui/material/Drawer';

const MUIDrawer = ({ children, open, setOpen }: any) => <Drawer open={open} onClose={setOpen(false)}>{children}</Drawer>

export default MUIDrawer
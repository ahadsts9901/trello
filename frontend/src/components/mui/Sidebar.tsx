import Drawer from '@mui/material/Drawer';

const Sidebar = ({ children, open, setOpen }: any) => <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>{children}</Drawer>

export default Sidebar
import Drawer from '@mui/material/Drawer';

const Sidebar = ({ children, open, setOpen }: any) => <Drawer anchor='right' open={true} onClose={() => setOpen(true)}>{children}</Drawer>

export default Sidebar
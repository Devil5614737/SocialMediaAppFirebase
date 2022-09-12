import {
  Box,
  Container,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { Link as Lnk } from "react-router-dom";
import { UploadModal } from "./UploadModal";
import { getAuth, signOut } from "firebase/auth";


export const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  

const handleLogout=()=>{
  const auth=getAuth();
  signOut(auth).then(()=>{
    navigate('/')
  }).catch((error)=>{
    alert(error)
  })
}

  return (
    <>
      <Box
        position={"sticky"}
        top={0}
        width="100%"
        zIndex={1232}
        boxShadow="10px 10px 10px rgba(0,0,0,.1)"
        background="white"
      >
        <Container maxW="container.xl" paddingTop={3} paddingBottom={3}>
          <Box display="flex" justifyContent="space-between">
            <Box display='flex' alignItems='center' gap={3}>
            <Lnk  to="/dashboard">
              <Link fontSize={18} fontWeight={500}>
                SocialHub
              </Link>
            </Lnk>
            

            </Box>
            <Box display="flex" gap={5} alignItems="center">
              <Lnk to="/dashboard">
                {" "}
                <Link fontSize={16}>Home</Link>
              </Lnk>
              <Link onClick={onOpen} fontSize={16}>
                Upload
              </Link>
              <Menu>
                <MenuButton as={Link}>
                  <Avatar
                    size="sm"
                    name="Dan Abrahmov"
                    src={currentUser && currentUser.photoURL}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Box>
      <UploadModal isOpen={isOpen} onClose={onClose} />
    
    </>
  );
};

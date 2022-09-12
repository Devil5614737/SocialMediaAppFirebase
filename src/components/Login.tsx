import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { Spinner } from "./Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClick = () => setShow(!show);

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setLoading(false);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        alert(errorMessage);
      });
    setEmail("");
    setPassword("");
  };

  return (
    <FormControl>
      <FormLabel fontSize={14}>Email </FormLabel>
      <Input
        type="email"
        marginBottom={5}
        value={email}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setEmail(e.currentTarget.value)
        }
      />
      <FormLabel fontSize={14}>Password </FormLabel>
      <InputGroup size="md" marginBottom={7}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          value={password}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setPassword(e.currentTarget.value)
          }
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        disabled={!email || !password}
        onClick={login}
        colorScheme="blue"
        width="100%"
      >
        {loading ? <Spinner color="white" size="sm" /> : "Login"}
      </Button>
    </FormControl>
  );
};

export default Login;

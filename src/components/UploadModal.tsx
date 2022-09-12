import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormLabel,
  Input,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { addDoc, collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthContextI } from "../interfaces/AuthContextI";
import { db, storage } from "../lib/firebase";

export const UploadModal = ({ isOpen, onClose }: any) => {
  const { currentUser } = useContext<AuthContextI>(AuthContext);
  const [file, setFile] = useState<File|null>();
  const [caption, setCaption] = useState<string>("");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const posts = collection(db, "posts");
        const date = new Date().getTime();

        const storageRef = ref(storage, `${file?.name + date}`);

        await uploadBytesResumable(storageRef, file)
          .then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
              await addDoc(posts, {
                caption,
                image: downloadURL,
                likes: [],
                comments: [],
                createdAt: serverTimestamp(),
                postedBy: {
                  uid: currentUser?.uid,
                  displayName: currentUser?.displayName,
                  photoURL: currentUser?.photoURL,
                },
              });
            });
          })
          .catch((e) => console.log(e));
      } catch (e) {
        // setLoading(false)
        alert(e);
      }
    }
    setCaption("");
    setFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={4}>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Select Image</FormLabel>
          <Input onChange={handleChange} type="file" marginBottom={5} />
          {file && (
            <Image
              marginBottom={3}
              src={URL.createObjectURL(file)}
              alt="post"
            />
          )}
          <Textarea
            placeholder="write a caption.."
            value={caption}
            onChange={(e:React.FormEvent<HTMLTextAreaElement>) =>
              setCaption(e.currentTarget.value)
            }
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleUpload} variant="solid">
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

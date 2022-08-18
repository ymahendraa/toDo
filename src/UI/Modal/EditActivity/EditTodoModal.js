import { useState } from "react";
import {
  Modal,
  Icon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { GoPrimitiveDot } from "react-icons/go";
import Select from "react-select";



const options = [
    { value: 1, text: "Very high", color: "#ED4C5C" },
    { value: 2, text: "High", color: "#FFCE31" },
    { value: 3, text: "Medium", color: "#00A790" },
    { value: 4, text: "Low", color: "#43C4E3" },
    { value: 5, text: "Very Low", color: "#B01AFF" },
  ];
const EditToDoModal = ({ onClose, isOpen, selectedData }) => {
  const [data, setData] = useState(
    {title:selectedData.title,
    is_active:selectedData.is_active,
    priority:selectedData.priority})
    console.log(data)
  // const [data, setData] = useState({
    
  // })
  // console.log(selectedData)
  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = (e) => {
    setSelectedOption(e);
  };
  const itemNameHandler = (event) => {
    setData({...data, title:event.target.value})
  }
  return (
    <div data-cy="edit-activity-modal">
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit List Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize={"xs"} fontWeight={'bold'}>NAMA LIST ITEM</FormLabel>
              <Input value={data.title} onChange={itemNameHandler}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={"xs"} fontWeight={'bold'}>PRIORITY</FormLabel>
              <Select
                // placeholder={e[0].label}
                components={{
                    IndicatorSeparator: () => null
                  }}
                value={selectedOption}
                options={options}
                onChange={handleChange}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon as={GoPrimitiveDot} color={e.color}/>
                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                  </div>
                )}
                delimiter={false}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"#16ABF8"}
              mr={3}
              borderRadius={"full"}
              color={"white"}
              w={"7rem"}
            >
              Tambah
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditToDoModal;

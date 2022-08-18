import { useState } from "react";
import {
  VStack,
  HStack,
  Text,
  Flex,
  Button,
  useDisclosure,
  Modal,
  Icon,
  Input,
  useToast,
} from "@chakra-ui/react";
import toDoEmpty from "../../img/todo-empty-state.png";
import { IoAddOutline } from "react-icons/io5";
import { FiChevronLeft } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import { RiArrowUpDownLine } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import AddToDoModal from "../../UI/Modal/AddActivity/AddToDoModal";
import DetailActList from "../../UI/DetailActList/DetailActList";
import EditToDoModal from "../../UI/Modal/EditActivity/EditTodoModal";
import Swal from "sweetalert2";
import "./DetailActivity.css";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { services } from "../../utilities/service";
import Header from "../../UI/Header/Header";
import { useNavigate } from "react-router-dom";

const DetailActivity = () => {
  let navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [actName, setActName] = useState({ title: "" });
  const [selectedData, setSelectedData] = useState({});
  const toast = useToast();
  let { id } = useParams();

  const getDetailAct = async () => {
    const data = await services["getDetailActivity"](id)
      .then(async (response) => {
        // console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    setActName({ title: data.title });
    return data;
  };

  const updateDetailAct = async () => {
    await services["updateDetailAct"](id, actName)
      .then(async (response) => {
        console.log(response.data);
        return response.data;
      })
      .catch(async (err) => {
        throw new Error(err.message);
      });
    // return data;
  };
  const { isLoadingUpdate, mutate } = useMutation(updateDetailAct);

  const {
    data: dataDetail,
    isError: isErrorDetail,
    isLoading: isLoadingDetail,
    isFetching: isFetchingDetail,
    isSuccess: isSuccessDetail,
  } = useQuery("detailAct", getDetailAct);

  const actNameHandler = (event) => {
    setActName({ title: event.target.value });
  };

  const submitActNameHandler = () => {
    mutate();
    setIsClicked(current => !current);
  };

  const modalAddHandler = () => {
    onOpenAdd();
  };

  const modalEditHandler = async (data) => {
    await setSelectedData(data);
    await onOpenEdit();
    console.log(data);
  };

  const swalHandler = (item) => {
    Swal.fire({
      // title: 'Are you sure?',
      html: "Apakah anda yakin akan menghapus item <b>bold text</b>",
      icon: "error",
      showCancelButton: true,
      // customClass: {
      //     cancelButton:"Custom_Cancel"
      // },
      confirmButtonColor: "#ED4C5C",
      cancelButtonColor: "grey",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        toast({
          // title: 'Account created.',
          render: () => (
            <HStack
              color="black"
              bg={"#fffff"}
              p={2}
              boxShadow={"dark-lg"}
              borderRadius="8px"
              w={"100%"}
            >
              <Icon as={AiOutlineInfoCircle} color={"#00A790"} w={5} h={5} />
              <Text>Activity berhasil dihapus</Text>
            </HStack>
          ),
          duration: 9000,
          isClosable: true,
        });
      }
    });
  };
  return (
    isSuccessDetail && (
      <div data-cy="detail-state-activity">
        <Header />
        <VStack
          width={"100%"}
          height={"85vh"}
          alignItems={"center"}
          // justifyContent={"center
          mt={"3rem"}
        >
          <HStack
            alignItems={"center"}
            width={"60vw"}
            justifyContent={"space-between"}
          >
            <HStack justifyContent={"center"} alignItems={"center"}>
              <Icon
                as={FiChevronLeft}
                w={8}
                h={8}
                color={"#000"}
                onClick={() => navigate(-1)}
                cursor={"pointer"}
              />
              {isClicked ? (
                <Input
                  variant="flushed"
                  value={actName.title}
                  color={"#000"}
                  fontSize={"4xl"}
                  fontWeight={"bold"}
                  onChange={actNameHandler}
                  onBlur={submitActNameHandler}
                />
              ) : (
                <h1 onClick={(current) => setIsClicked(!current)}>{actName.title}</h1>
              )}

              <Icon
                as={BiPencil}
                w={8}
                h={8}
                color={"#000"}
                cursor={"pointer"}
              />
            </HStack>

            <HStack
              justifyContent={"center"}
              alignItems={"center"}
              gap={"1rem"}
            >
              <Flex
                borderRadius={"full"}
                w={"3rem"}
                h={"3rem"}
                borderColor={"blackAlpha.200"}
                borderWidth={"1px"}
                justifyContent={"center"}
                alignItems={"center"}
                cursor={"pointer"}
              >
                <Icon
                  as={RiArrowUpDownLine}
                  w={6}
                  h={6}
                  color={"blackAlpha.500"}
                />
              </Flex>
              <Button
                leftIcon={<IoAddOutline />}
                backgroundColor={"#16ABF8"}
                variant="solid"
                color={"#ffff"}
                borderRadius="2rem"
                cursor={"pointer"}
                onClick={modalAddHandler}
              >
                Tambah
              </Button>
            </HStack>
          </HStack>
          {dataDetail.todo_items ? (
            dataDetail.todo_items.map((todo) => (
              <DetailActList
                // onEdit={modalEditHandler}
                data-cy="detail-list"
                swal={swalHandler}
                item={todo}
                key={todo.id}
                modalEditHandler={modalEditHandler}
              />
            ))
          ) : (
            <img src={toDoEmpty} alt="toDoEmpty" />
          )}
        </VStack>
        <AddToDoModal onClose={onCloseAdd} isOpen={isOpenAdd} id={id}/>
        <EditToDoModal
          onClose={onCloseEdit}
          isOpen={isOpenEdit}
          selectedData={selectedData}
        />
      </div>
    )
  );
};

export default DetailActivity;

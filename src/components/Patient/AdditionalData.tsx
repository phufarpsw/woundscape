import ConfirmModal from "@components/ConfirmModal";
import { useEffect, useRef, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { Input, InputRef, Select, Space, Tag, Tooltip, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  IFormattedErrorResponse,
  IPatient,
  selectStage,
  selectStatus,
} from "@constants";
import { tagInputStyle, tagPlusStyle } from "@config";
import { IUpdateCase, getCaseByCaseId, updateCase } from "@api-caller/caseApi";

interface IAdditionalDataProps {
  data: IPatient;
}

interface IDataStageProps {
  stage: string;
  value: any;
}

export default function AdditionalData({ data }: IAdditionalDataProps) {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateCase
  > = useMutation(updateCase);
  const [cases, setCases] = useState<IPatient>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [tag, setTag] = useState<IDataStageProps>({
    stage: "",
    value: "",
  });
  const [tags, setTags] = useState<string[]>(data.disease);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  // useEffect(() => {
  //   if (case_id) {
  //     getCase();
  //   }
  // }, []);
  async function getCase() {
    const _case: IPatient = await getCaseByCaseId(data.case_id as string);
    setCases(_case);
    setTags(_case.disease);
  }
  const handleClose = (e: React.MouseEvent<HTMLElement>, value: string) => {
    e.preventDefault();
    let disease = tags.filter((item) => item != value);
    setTag({ stage: "case_disease", value: disease });
    showModal();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue != "") {
      let disease = [...tags, inputValue];
      setTag({ stage: "case_disease", value: disease });
      showModal();
    } else {
      setInputVisible(false);
    }
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onSubmit = () => {
    setSubmitLoading(true);
    let body: IUpdateCase = {
      case_id: data.case_id || "",
      body: { [tag.stage]: tag.value },
    };
    updateMutation.mutate(body, {
      onSuccess: () => {
        if (data.stage == "case_disease") {
          setInputVisible(false);
          setInputValue("");
        }
        getCase();
        setIsModalOpen(false);
        setSubmitLoading(false);
      },
    });
  };
  // const handleClose = (removedTag: string) => {

  // const newTags = tags.filter((tag) => tag !== removedTag);
  // console.log(newTags);
  // setTags(newTags);
  // };
  return (
    <>
      <div className="flex space-x-2 items-center">
        <Typography id="text__primary">Status :</Typography>
        <Select
          style={{ width: 150 }}
          placeholder="Select"
          value={cases?.status}
          options={selectStatus}
          onChange={(value) => {
            setTag({ stage: "case_status", value: value });
            showModal();
          }}
        />
        <Typography id="text__primary">Progression Stage :</Typography>
        <Select
          style={{ width: 200 }}
          placeholder="Select"
          value={cases?.stage || null}
          options={selectStage}
          onChange={(value) => {
            setTag({ stage: "case_stage", value: value });
            showModal();
          }}
        />
        <Space size={[0, 8]} wrap>
          <ConfirmModal
            title="Are you sure ?"
            description="Are you sure that the hospital number you entered is 9877069?"
            isOpen={isModalOpen}
            confirmLoading={submitLoading}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
          <Typography id="text__primary">Disease :</Typography>
          {tags?.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={(e) =>
                    setTag({ stage: "case_disease", value: e.target.value })
                  }
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable
                style={{
                  userSelect: "none",
                  color: "#4C577C",
                  fontFamily: "jura",
                }}
                color="#F4DEE7"
                onClose={(e) => handleClose(e, tag)}
              >
                <span
                // onDoubleClick={(e) => {
                //   if (index !== 0) {
                //     setEditInputIndex(index);
                //     setEditInputValue(tag);
                //     e.preventDefault();
                //   }
                // }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={tagInputStyle}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag
              style={tagPlusStyle}
              icon={<PlusOutlined />}
              onClick={() => setInputVisible(true)}
              className="jura"
            >
              Add Tag
            </Tag>
          )}
        </Space>
      </div>
    </>
  );
}

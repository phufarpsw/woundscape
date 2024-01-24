import { UseMutationResult, useMutation } from "react-query";
import { LeftOutlined } from "@ant-design/icons";
import { IUpdateCase, updateCase } from "@api-caller/caseApi";
import { IDoctor, IFormattedErrorResponse } from "@constants/interface";
import UserProfile from "@features/UserProfile";
import { Table } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { getColumnManageUser } from "@components/Management/ColumnTable";
import getAllDoctor from "@api-caller/doctorApi";
import ConfirmModal from "@components/ConfirmModal";

export default function Management() {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateCase
  > = useMutation(updateCase);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  useEffect(() => {
    getAllDoctor(false).then((doctors) => {
      setDoctors(doctors);
      setLoading(false);
    });
  }, []);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isConfirmmOpen, setIsConfirmOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onCancel = () => {
    setIsConfirmOpen(!isConfirmmOpen);
  };
  const onSubmit = () => {
    setConfirmLoading(true);
    // setIsConfirmOpen(!isConfirmmOpen);
  };
  const onChangeDoctor = () => {};
  const columns: ColumnsType<IDoctor> = getColumnManageUser({
    isEditable,
    onChangeDoctor,
  });
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <LeftOutlined />
                <p className="jura text-xl">User Management</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6">
              <div className="w-full h-full flex">
                <div className="w-full flex flex-col">
                  {/* Input Filter */}
                  {/* Body */}
                  <Content className="w-full h-full grow">
                    <Table
                      id="management__table__patient"
                      dataSource={doctors}
                      columns={columns}
                      loading={loading}
                      tableLayout="fixed"
                      rowKey={(_, index) => `table__row__${index}`}
                    />
                    <ConfirmModal
                      title="Change new doctor"
                      description={
                        "If you change new doctor, it will disappear from current doctor and send this patient to new doctor"
                      }
                      isOpen={isConfirmmOpen}
                      confirmLoading={confirmLoading}
                      onSubmit={onSubmit}
                      onCancel={onCancel}
                    />
                  </Content>
                </div>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}

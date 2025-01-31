// columnsConfig.ts
import { Typography, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { UseMutationResult } from "react-query";
import { DropdownField } from "@components/Allocation/DropdownField";
import { formatDate } from "@utils";
import { ICase, IDoctor, IFormattedErrorResponse } from "@constants";
import { IUpdateCase } from "@api-caller/caseApi";

interface ColumnsConfigProps {
  updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateCase
  >;
  doctors: IDoctor[];
}

export const getColumnsAllocation = ({
  updateMutation,
  doctors,
}: ColumnsConfigProps): ColumnsType<ICase> => [
  {
    title: "Hospital No.",
    dataIndex: "hn_id",
    key: "hn_id",
    render(value: string, _, index) {
      return (
        <>
          <Typography key={index} id="text__primary" className="truncate">
            {value}
          </Typography>
        </>
      );
    },
  },
  {
    title: "User id.",
    dataIndex: "line_uid",
    key: "line_uid",
    render(value, _, index) {
      return (
        <>
          <Typography key={index} id="text__primary" className="truncate">
            {value || "-"}
          </Typography>
        </>
      );
    },
  },
  {
    title: "Doctor",
    dataIndex: "doctor_assign",
    key: "doctor_assign",
    render: (_, data, index) => (
      <DropdownField
        key={index}
        data={data}
        doctor={doctors}
        updateMutation={updateMutation}
      />
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => <div id="text__primary">{value || "-"}</div>,
  },
  {
    title: "Progression Stage",
    dataIndex: "stage",
    key: "stage",
    render: (value) => <div id="text__primary">{value || "-"}</div>,
  },
  {
    title: "Last Updated",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (_, { updated_at }, index) => (
      <Typography key={index} id="text__primary">
        {formatDate(updated_at)}
      </Typography>
    ),
  },
  {
    title: "Start date & time",
    dataIndex: "created_at",
    key: "created_at",
    render: (_, { created_at }, index) => (
      <Typography key={index} id="text__primary">
        {formatDate(created_at)}
      </Typography>
    ),
  },
  {
    title: "Disease",
    dataIndex: "disease",
    key: "disease",
    render: (_, { disease }) => (
      <div className="flex items-center">
        {disease && disease.length > 0 ? (
          <>
            <Tag
              color={"pink" }
              className="jura"
            >
              {disease[0]}
            </Tag>
            {disease.length > 1 && (
              <Typography id="text__disease">+{disease.length - 1}</Typography>
            )}
          </>
        ) : (
          <div className="jura text-center">-</div>
        )}
      </div>
    ),
  },
];

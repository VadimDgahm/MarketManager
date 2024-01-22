import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@/components/ui/checkbox";
import { Table } from "@/components/ui/table/Table";
import { CellVariant } from "@/components/ui/table/TableCellVariant/TableCellVariant";

const meta = {
  argTypes: {},
  component: Table.Root,
  tags: ["autodocs"],
  title: "Components/Table",
} satisfies Meta<typeof Table.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableDefault: Story = {
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell variant={"head"}>Name</Table.Cell>
            <Table.Cell variant={"head"}>Cards</Table.Cell>
            <Table.Cell variant={"head"}>
              <CellVariant.WithSort sort={"up"} title={"Last Updated"} />
            </Table.Cell>
            <Table.Cell variant={"head"}>Created by</Table.Cell>
            <Table.Cell variant={"head"}></Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <CellVariant.WithImage title={"Name"} />
            </Table.Cell>
            <Table.Cell>
              <CellVariant.PlayEditAndTrash />
            </Table.Cell>
            <Table.Cell>
              <CellVariant.EditAndTrash title={"Name"} />
            </Table.Cell>
            <Table.Cell>
              <CellVariant.Stars value={6} />
            </Table.Cell>
            <Table.Cell>
              <Checkbox label={"Name"} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <CellVariant.WithImage title={"Name"} />
            </Table.Cell>
            <Table.Cell>
              <CellVariant.PlayEditAndTrash />
            </Table.Cell>
            <Table.Cell>
              <CellVariant.WithSort sort={"up"} title={"Name"} />
            </Table.Cell>
            <Table.Cell>
              <CellVariant.Stars value={4} />
            </Table.Cell>
            <Table.Cell>
              <Checkbox />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </>
    ),
  },
};

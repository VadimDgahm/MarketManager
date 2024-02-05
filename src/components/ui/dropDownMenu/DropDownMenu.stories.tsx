import type { Meta, StoryObj } from "@storybook/react";

import { DropDownMenu } from "@/components/ui/dropDownMenu/DropDownMenu";
import { MenuContent } from "@/components/ui/dropDownMenu/menuContent/MenuContent";
import { MenuContentWithAvatar } from "@/components/ui/dropDownMenu/menuСontentWithAvatar/MenuContentWichAvatar";
import { Calendar } from "@/components/ui/icons/calendar/Calendar";
import { EditOutline } from "@/components/ui/icons/edit-outline/EditOutline";
import { PlayCircleOutline } from "@/components/ui/icons/play-circle-outline/PlayCircleOutline";
import { TrashOutline } from "@/components/ui/icons/trash-outline/TrashOutline";

const meta = {
  argTypes: {},
  component: DropDownMenu,
  tags: ["autodocs"],
  title: "Components/DropDownMenu",
} satisfies Meta<typeof DropDownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropDownMenu1: Story = {
  args: {
    children: (
      <>
        <MenuContentWithAvatar
          name={"Ivan"}
          onClickAvatar={() => alert("click avatar")}
          url={"j&johnson@gmail.com"}
        />
        <MenuContent
          onClick={() => alert("Learn")}
          svgIcon={<PlayCircleOutline />}
          title={"Learn"}
        />
        <MenuContent
          onClick={() => alert("Edit")}
          svgIcon={<EditOutline />}
          title={"Edit"}
        />
        <MenuContent
          isLine
          onClick={() => alert("Delete")}
          svgIcon={<TrashOutline />}
          title={"Delete"}
        />
      </>
    ),
    trigger: <Calendar />,
  },
};

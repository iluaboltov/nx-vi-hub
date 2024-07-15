import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared-ui/components/dropdown-menu";

export const Footer = () => {
  return (
    <footer>
      <div className={"flex justify-around"}>
        <div>Info 1</div>
        <div>Info 2</div>
        <div>Info 3</div>
        <div>Info 4</div>
      </div>
      <div>
        Language:
        <DropdownMenu>
          <DropdownMenuTrigger>Your languages or [ DefaultLang ]</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Ukrainian</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </footer>
  );
};

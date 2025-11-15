import { BoxIcon } from "lucide-react";

/**
 * @returns Logo component
 * This component is used to display the logo with the name "Zippee"
 */
const Logo = () => {
    return (
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="/" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <BoxIcon className="size-4" />
          </div>
          Zippee
        </a>
      </div>
    );
}

export default Logo;
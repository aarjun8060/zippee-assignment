import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "../ui/card";
interface HeaderProps {
    title: string;
    description: string;
}

/**
 * @returns Header component
 * This component is used to display a header using title and description
 */
const Header = ({
    title,
    description,
}: HeaderProps) => {
    return (
        <Card>  
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
  );
};

export default Header;
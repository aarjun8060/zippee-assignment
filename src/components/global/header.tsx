import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card";
interface HeaderProps {
    title: string;
    description: string;
}

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
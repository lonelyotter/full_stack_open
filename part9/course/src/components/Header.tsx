interface headerProps {
  name: string;
}

const Header = (props: headerProps) => {
  return (
    <header>
      <h1>{props.name}</h1>
    </header>
  );
};

export default Header;

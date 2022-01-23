import PropTypes from "prop-types";
import { ButtonLoadMore } from "./Button.styled";

export const Button = ({ onClick }) => {
  return (
    <ButtonLoadMore className="Button" type="button" onClick={onClick}>
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

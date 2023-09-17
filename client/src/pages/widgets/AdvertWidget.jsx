import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://images.unsplash.com/photo-1624638760852-8ede1666ab07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Humanitarian Aid Foundation (HAF)</Typography>
        <Typography color={medium}>haf.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        The Humanitarian Aid Foundation (HAF) is a non-profit organization
        dedicated to providing emergency relief and sustainable development
        assistance to communities in crisis.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;

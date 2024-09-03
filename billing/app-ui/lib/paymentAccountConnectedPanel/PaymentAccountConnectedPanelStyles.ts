import styled from "styled-components";
import { Chip, PrimaryButton, SecondaryButton } from "@demo/ui-design-system";

export const EmailChip = styled(Chip)`
  width: fit-content;
  margin-top: 4rem;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-in-between;
  margin: 0.6rem 0 1rem 0;
`;

export const ViewAccountButton = styled(PrimaryButton)`
  margin: 0.5rem;
`;

export const DisconnectButton = styled(SecondaryButton)`
  margin: 0.5rem;
`;

import {BackgroundUpdateInProgress, StaleMessage, UpToDate} from "./message-component.tsx";

export function CheckoutMessage({refetch, isStale, isFetching}: { refetch: () => void, isStale: boolean, isFetching: boolean }) {
  if (isFetching) {
    return <BackgroundUpdateInProgress/>;
  }

  if (isStale) {
    return <StaleMessage refetch={refetch}/>;
  }

  return <UpToDate/>;
}
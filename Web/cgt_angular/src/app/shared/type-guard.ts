import { PumpedGrouped } from "../home/feeding-tracker/feeding-tracker.model";

export const isResponsePumped = (response: any): response is PumpedGrouped => {
    return (response as PumpedGrouped).pumpedMode !== undefined;
}
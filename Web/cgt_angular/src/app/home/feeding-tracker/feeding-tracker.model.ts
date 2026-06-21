export interface Feeds {
    _id: string;
    feed_taken_type: string;
    feedTaker: CareTakenDetail;
    feed_taken_mode: string;
    feed_taken_side: string;
    feed_start_time: string;
    feed_end_time: string;
    feed_taken_time: string;
    feed_quantity: number;
    pumpedFeedId: string
    pump_start_time: string;
    pump_end_time: string;
    pumped_mode: string;
    pumped_side: string;
    pumped_quantity: number;
    pumped_time: string;
}

export interface PumpedGrouped {
    id: string;
    pumpedMode: string;
    pumpedSide: string;
    pumpedQuantity: number;
    pumpedStartDate: string;
    pumpedStartTime: string;
    pumpedEndDate: string;
    pumpedEndTime: string;
    pumpedTimeTaken: string;
}

export interface FeedGrouped {
    id: string;
    type: string;
    mode: string;
    side: string;
    quantity: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    timeTaken: string;
}

export interface FeedGroupedByDate {
    [date: string]: (FeedGrouped | PumpedGrouped)[];
}

interface CareTakenDetail {
    _id: string;
    care_taken_name: string;
}
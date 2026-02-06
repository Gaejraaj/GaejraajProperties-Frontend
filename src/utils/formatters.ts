import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format("MMM D, YYYY");
};

export const formatRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

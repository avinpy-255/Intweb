import axiosService from "@/lib/axios";

interface RoomData {
  roomId: string;
  roomName: string;
  
}

export const getRooms = async (): Promise<RoomData[] | []> => {
  try {
    const response = await axiosService.get<RoomData[]>("/");
    const { status, data } = response;

    if (status === 200 && Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

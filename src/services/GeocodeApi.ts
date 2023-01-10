export class GeocodeApi {
  static async reverse(latitude: number, longitude: number) {
    const res = await (
      await fetch(
        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
      )
    ).json();

    return {
      city: res?.address?.city,
      street: res?.address?.road
        ? `${res?.address?.road} ${res?.address?.house_number ?? ''}`.trim()
        : undefined,
    };
  }
}

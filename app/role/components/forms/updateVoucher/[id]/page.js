import UpdateVoucher from "../page";

// Function to fetch voucher data from the server
const getVoucher = async (id) => {
  try {
    const res = await fetch(`/api/voucher/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch voucher");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditVoucher({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid Voucher</div>;
  }

  try {
    const voucher = await getVoucher(id);
    if (voucher) {
      const { voucherName, percentageOff, minSpend, discountCap, usageQuantity, startTime, endTime, voucherCode } = voucher;
      return (
        <UpdateVoucher
          id={id}
          voucherName={voucherName}
          percentageOff={percentageOff}
          minSpend={minSpend}
          discountCap={discountCap}
          usageQuantity={usageQuantity}
          startTime={startTime}
          endTime={endTime}
          voucherCode={voucherCode}
        />
      );
    } else {
      // Handle the case where the voucher is not found or other error
      return <div>Voucher not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading voucher: {error.message}</div>;
  }
}
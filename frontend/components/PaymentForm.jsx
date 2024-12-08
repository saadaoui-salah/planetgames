import { useCreateOrder } from "@/roupi/order";
import { Input } from "@/forms/Input";
import { useState } from "react";

export const PaymentForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    postalCode: "",
  });
  const { submit } = useCreateOrder();

  return (
    <form className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col mb-4">
        <Input
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value,
            })
          }
          value={form.fullName}
          label={"Full Name"}
          type={"text"}
        />
      </div>
      <div className="flex flex-col mb-4">
        <Input
          value={form.address}
          onChange={(e) =>
            setForm({
              ...form,
              address: e.target.value,
            })
          }
          type="text"
          label="Address"
        />
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col mr-4 w-[170px]">
          <Input
            value={form.phoneNumber}
            onChange={(e) =>
              setForm({
                ...form,
                phoneNumber: e.target.value,
              })
            }
            type="text"
            label="Phone Number"
          />
        </div>
        <div className="flex flex-col mb-8 w-[150px]">
          <Input
            value={form.postalCode}
            onChange={(e) =>
              setForm({
                ...form,
                postalCode: e.target.value,
              })
            }
            type="text"
            label="Postal Code"
          />
        </div>
      </div>
      <button
        onClick={(e) => submit(e, form)}
        type="submit"
        className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit your order
      </button>
    </form>
  );
};

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import Container from "../../components/Container";
import BannerCard from "../../components/BannerCard";
import BenefitsCard from "../../components/BenefitsCard";
import clsx from "clsx";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const existsAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const result = await fetch(`${API_URL}/user/authToken`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.ok;
};

const handleSubmit = () => {};
const handleZipCode = async () => {};

type FormData = {
  firstName: string;
  lastName: string;
  companyName: string;
  zipCode: string;
};

const Checkout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [dataForm, setDataForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    zipCode: "",
  });

  useEffect(() => {
    existsAuth().then(setIsAuthenticated);
  }, []);

  if (isAuthenticated === null) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const inputClass = "border border-black rounded-[10px] h-[75px] px-2";
  const labelClass = "flex flex-col gap-[22px]";

  return (
    <Container>
      <BannerCard
        title="Checkout"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
      />
      <div className={clsx("py-13")}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={clsx("font-poppins", "flex justify-around flex-wrap")}
        >
          <div className={clsx("flex flex-col gap-9")}>
            <h1 className={clsx("text-[36px] font-bold")}>Billing details</h1>
            <div className={clsx("flex gap-7.75")}>
              <label className={clsx(labelClass)}>
                <h1>First name</h1>
                <input
                  type="text"
                  className={clsx(inputClass, "w-50")}
                  value={dataForm?.firstName}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      firstName: e.target.value,
                    })
                  }
                  required
                ></input>
              </label>
              <label className={clsx(labelClass)}>
                <h1>Last name</h1>
                <input
                  type="text"
                  className={clsx(inputClass, "w-50")}
                  value={dataForm?.lastName}
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      lastName: e.target.value,
                    })
                  }
                  required
                ></input>
              </label>
            </div>
            <label className={clsx(labelClass)}>
              <h1>Company Name (Optional)</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                value={dataForm?.companyName}
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    companyName: e.target.value,
                  })
                }
              />
            </label>
            <label className={clsx(labelClass)}>
              <h1>ZIP Code</h1>
              <input
                type="text"
                className={clsx(inputClass)}
                value={dataForm?.zipCode}
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    zipCode: e.target.value,
                  });
                  handleZipCode();
                }}
                required
              />
            </label>
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Place order
            </button>
          </div>
        </form>
      </div>
      <BenefitsCard />
    </Container>
  );
};

export default Checkout;

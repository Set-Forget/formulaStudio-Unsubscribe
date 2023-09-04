import { useState } from "react";
import useAxios from "axios-hooks";
import Spinner from "./Spinner";
// import ProgressBar from './ProgressBar'

const endPoint =
  "https://script.google.com/macros/s/AKfycbzTP-X1i0OKCPr8Mah3ZqFI15FC-FG7SOzF_okS8-E6PRyJHK56DNlKsSN3NukreE-b0w/exec";

export default function MainForm() {
  const [repairCategory, setRepairCategory] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomField, setShowCustomField] = useState(false);
  const [warning, setWarning] = useState(false)
  const [successMessage, setSuccessMessage] = useState(false)



  const [{loading, error }] = useAxios(endPoint);
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost,
  ] = useAxios(
    {
      url: endPoint + "?route=createUnsubscribe",
      method: "POST",
    },
    { manual: true }
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description || !email || !repairCategory) {
      return setWarning(true);
    }

    const finalRepairCategory =
      repairCategory === "CUSTOM" ? customCategory : repairCategory;

    const body = {
      description: description,
      repairCategory: finalRepairCategory,
      email
    };
    const response = await executePost({
      data: JSON.stringify(body),
    });
    if (response) {
      setDescription("");
      setEmail("");
      setRepairCategory("");
      setCustomCategory("");
      setShowCustomField(false);
      setSuccessMessage(true);
      setWarning(false);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 4000);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setRepairCategory(value);
    if (value === "CUSTOM") {
      setShowCustomField(true);
    } else {
      setShowCustomField(false);
    }
  };

  if (error || postError)
    return <h2 className="text-lg text-center p-4">Error</h2>;
  if (loading || postLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700">
            * Formula Studio Email
          </label>
          <input
            type="text"
            placeholder="Please write your Formula Studio Email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded border shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-stone-500">* How did you found Formula Studio?</label>
          <select
            value={repairCategory}
            onChange={handleChange}
            className="p-2 rounded border shadow-sm"
          >
            <option value="" disabled selected>
              Select a option
            </option>
            <option value="AppSumo">AppSumo</option>
            <option value="Friends or Family">
            Friends or Family
            </option>
            <option value="Google Marketplace">Google Marketplace</option>
            <option value="Social Media">Social Media</option>
            <option value="CUSTOM">Other (please specify)</option>
          </select>
          {showCustomField && (
            <input
              type="text"
              placeholder="Write here"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="p-2 rounded border shadow-sm mt-2"
            />
          )}
        </div>

        <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              * Why are you leaving?
            </label>
            <div className="mt-2">
              <textarea
                rows={4}
                name="comment"
                id="comment"
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>



      </div>

      {warning && (
        <p className="text-sm text-red-600 mt-4 mb-4" id="email-error">
          Complete the required fields *
        </p>
      )}
      {successMessage && (
        <div className="rounded-md bg-green-50 p-4 my-4" id="message">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Successfully uploaded
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <ProgressBar progress={percentage} /> */}
      <button
        type="submit"
        className={`${
          !warning && "mt-4"
        } rounded-md bg-emerald-700 px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500`}
      >
        Unsubscribe
      </button>
    </form>
  );
}

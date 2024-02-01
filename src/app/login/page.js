"use client";
import Link from "next/link";
import axios from 'axios';
import { useMemo, useState } from "react";
import { Alert, message } from 'antd';
import { jsonParse } from "../Gurd/page";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();

  const tost = (type, data) => {
    messageApi.open({
      type: type,
      content: data,
    });
  };

  let rawInstanceConfig = {
    baseURL: "https://51.20.20.105",
    timeout: 60000,
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'Origin': '*'
      // 'WebpSupport': (webp_support() ? 'yes' : 'no'),
    }
  };
  const rawInstance = axios.create(rawInstanceConfig);

  const login = (body) => {
    return rawInstance.post('https://51.20.20.105/api/v1/login/', body, { withCredentials: true });

  }
  const fetchFact = (e) => {
    e.preventDefault();
    const requestData = {
      "email": email,
      "password": password
    }

    login(requestData).then(async (response) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem("data", JSON.stringify(response.data))
        tost('success', 'Login Sucessfull')
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        setTimeout(() => {
          router.push('/')
        }, 700);
        
      }
    }).catch(error => {
      tost('error', 'Please Enter Correct Username And Password')
    }).finally(() => {
      console.log()
    });
  };
    return(
      <div>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[175px] lg:pb-28">
      <div className="container max-w-full">
        {contextHolder}
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded-md bg-primary py-10 px-6 dark:bg-dark sm:p-[60px] dark:bg-gray-800">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Sign in to your account
              </h3>
              <p className="mb-11 text-center text-base font-medium text-body-color">
                Login to your account for Explore Somthing New.
              </p>
              <div className="mb-8 flex items-center justify-center">
                <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
                <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color sm:block"></span>
              </div>
              <form>
                <div className="mb-8">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="password"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                  />
                </div>
                <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                  <div className="mb-4 sm:mb-0">
                  </div>
                  <div>
                    <a
                      href="#0"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="mb-6">
                  <button onClick={(e) => { fetchFact(e) }} className="bg-slate-700 flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_95:1005"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#090E34" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
              fill="url(#paint1_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="160.5"
              y1="220"
              x2="1099.45"
              y2="1192.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
</div>
    )
}

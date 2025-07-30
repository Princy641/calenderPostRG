"use client"

import { lazy, Suspense, useState, useEffect } from "react"
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import LoadingFallback from "../component/_common/LoadingFallback/LoadingFallback"
import Plans from "../component/SelfService/ChoosePlan/ChoosePlan"
import CreateAccount from "../component/SelfService/CreateAccount/CreateAccount"
import User from "../component/SelfService/User/User"
import Hotel from "../component/SelfService/Hotel/Hotel"
import Business from "../component/SelfService/Business/Business"
import SocialChannels from "../component/SelfService/SocialChannels/SocialChannels"
import Headers from "../component/Headers/Headers"



// Lazy load main app components
const Dashboard = lazy(() => import("../component/CreateCalender/Dashboard/Dashboard"))
const Calendar = lazy(() => import("../component/CreateCalender/Calender/Calender"))
const SocialListening = lazy(() => import("../component/CreateCalender/SocialListening/SocialListening"))
const Posts = lazy(() => import("../component/CreateCalender/Posts/Posts"))
const SidebarNavigation = lazy(() => import("../component/CreateCalender/Sidebar/SidebarNavigation"))
const SignIn = lazy(() => import("../component/SignIn/SignIn"))
const CreatePostAttachment = lazy(() => import("../component/CreatePost"))

/**
 * Step navigation component
 */
const StepNavigation = ({ onComplete }) => {
  const [step, setStep] = useState(0)

  return (
    <>
    <Headers />
      {/* {step === 0 && <Plans onStart={() => setStep(1)} />} */}
      {step === 0 && <CreateAccount onNext={() => setStep(1)} />}
      {step === 1 && <User onNext={() => setStep(2)} onBack={() => setStep(0)} />}
      {step === 2 && <Hotel onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {/* {step === 2 && <Business onNext={() => setStep(3)} onBack={() => setStep(1)} />} */}
      {step === 3 && (
        <SocialChannels
          onNext={() => {
            localStorage.setItem("onboardingComplete", "true")
            onComplete()
          }}
          onBack={() => setStep(2)}
        />
      )}

    </>
  )
}

/**
 * Main application routes
 */
const AppRoutes = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [onboardingComplete, setOnboardingComplete] = useState(localStorage.getItem("onboardingComplete") === "true")

  useEffect(() => {
    // Redirect to sign-in on initial load
    if (location.pathname === "/") {
      navigate("/sign-in", { replace: true })
    }
  }, [location.pathname, navigate])

  return (
    <Routes>
      {/* Root path redirects based on onboarding status */}
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

        <Route
        path="/sign-in"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <SignIn />
          </Suspense>
        }
      />

      {/* Onboarding route */}
      <Route
        path="/get-started"
        element={
          onboardingComplete ? (
            <Navigate to="/create-post" replace />
          ) : (
            <StepNavigation
              onComplete={() => {
                setOnboardingComplete(true)
                navigate("/create-post", { replace: true })
              }}
            />
          )
        }
      />

            {/* Direct signup route */}
            <Route
        path="/sign-up"
        element={
          onboardingComplete ? (
            <Navigate to="/calendar" replace />
          ) : (
            <StepNavigation
              initialStep={1}
              onComplete={() => {
                setOnboardingComplete(true)
                navigate("/calendar", { replace: true })
              }}
            />
          )
        }
      />


      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <SidebarNavigation />
            <Dashboard />
          </Suspense>
        }
      />

      <Route
        path="/calendar"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <SidebarNavigation />
            <Calendar />
          </Suspense>
        }
      />

      <Route
        path="/social-listening"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <SidebarNavigation />
            <SocialListening />
          </Suspense>
        }
      />

      <Route
        path="/posts"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <SidebarNavigation />
            <Posts />
          </Suspense>
        }
      />

      

      <Route
        path="/create-post"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <CreatePostAttachment />
          </Suspense>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
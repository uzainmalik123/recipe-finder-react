import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { LoginForm } from "./../components";
import SignupForm from "./SignupForm";
import type { NavbarProps } from "@/types/properties.types";
import { toast } from "sonner";
import { Heart } from "lucide-react";

const Navbar = ({
  currentUser,
  userLoggedIn,
  logout,
  setShowFavorites
}: NavbarProps) => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logout();
      toast.success("Success", {
        description: "Logged out successfully",
      });
    } catch (error) {
      toast.error("Error", {
        description: error instanceof Error ? error.message : "Log out failed",
      });
    }
  };

  return (
    <nav className="max-w-480 w-full h-20 gap-3 flex items-center justify-end">
      {!currentUser && !userLoggedIn ? (
        <>
          {" "}
          <Button
            onClick={() => setOpenLogin(true)}
            className="bg-primary cursor-pointer"
          >
            Login
          </Button>
          <Dialog open={openLogin} onOpenChange={setOpenLogin}>
            <DialogContent className="w-100 px-0 py-5">
              <LoginForm setOpenLogin={setOpenLogin} />
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => setOpenSignup(true)}
            className="bg-background cursor-pointer text-primary border-2 border-primary hover:text-background"
          >
            Sign-up
          </Button>
          <Dialog open={openSignup} onOpenChange={setOpenSignup}>
            <DialogContent className="w-100 px-0 py-5">
              <SignupForm setOpenSignup={setOpenSignup} />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="flex justify-between gap-3">
          <Button onClick={() => setShowFavorites(true)} className="cursor-pointer"><Heart className="w-4 h-4" />Favorites</Button>
          <Button
            onClick={handleLogout}
            className="bg-secondary cursor-pointer"
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

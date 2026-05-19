import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./shadcn/dropdown-menu";
import { useAuthStore } from "@/store/useAuth";
import { Avatar, AvatarFallback } from "./shadcn/avatar";
import { supabase } from "@/lib/supabase";

export const UserButton: React.FC = () => {
  const authUser = useAuthStore((state) => state.user);
  const setSession = useAuthStore((state) => state.setSession);

  const resolveFallbackText = () => {
    if (!authUser) {
      return null;
    }

    let words: string[] = [];
    
    if (!!authUser.user_metadata['display_name']) {
      words = authUser.user_metadata['display_name'].split(' ');
    } else {
      words = authUser.email?.split('@') ?? [];
    }

    if (words.length === 0) {
      return null;
    } 
    
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return words.slice(0, 2).reduce((result, current) => {
      return result + current[0].toUpperCase();
    }, '');
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  }

  if (!authUser) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            {resolveFallbackText()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-2 px-2">
        <DropdownMenuGroup className="flex gap-2 items-center py-2">
          <Avatar>
            <AvatarFallback>
              {resolveFallbackText()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-sm leading-tight">{authUser.user_metadata['display_name']}</p>
            <p className="text-sm leading-tight text-muted-foreground">{authUser.email}</p>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
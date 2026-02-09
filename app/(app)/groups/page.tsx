"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useGroup } from "@/hooks/useGroup";
import GroupStatus from "@/components/groups/GroupStatus";
import CreateGroup from "@/components/groups/CreateGroup";
import JoinGroup from "@/components/groups/JoinGroup";

export default function GroupsPage() {
  const { user } = useAuth();
  const { activeGroup, refresh } = useProfile(user?.id);
  const { createGroup, joinGroup } = useGroup(user?.id);

  const handleCreate = async (name: string, code: string) => {
    await createGroup(name, code);
    refresh();
    (window as any).__refreshProfile?.();
  };

  const handleJoin = async (code: string) => {
    await joinGroup(code);
    refresh();
    (window as any).__refreshProfile?.();
  };

  return (
    <div>
      <GroupStatus group={activeGroup} />
      <CreateGroup onCreate={handleCreate} />
      <JoinGroup onJoin={handleJoin} />
    </div>
  );
}

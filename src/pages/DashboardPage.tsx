import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Package,
  Heart,
  MessageSquare,
  DollarSign,
  User,
  Settings,
  Bell,
  TrendingUp,
  Users,
  ShoppingBag,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { listingService } from "@/api/services/listing.service";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/dialog";
import ListingCard from "@/components/features/listings/ListingCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

// Dashboard Sub-pages
const DashboardHome = () => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("month");

  // Mock stats - replace with actual API calls
  const stats = [
    { label: "Total Listings", value: "24", icon: Package, change: "+12%" },
    { label: "Total Views", value: "1,245", icon: Eye, change: "+23%" },
    { label: "Messages", value: "42", icon: MessageSquare, change: "+5%" },
    {
      label: "Total Earnings",
      value: "₹45,320",
      icon: DollarSign,
      change: "+18%",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New listing published",
      item: "iPhone 13 Pro",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Message received",
      item: "From John Doe",
      time: "4 hours ago",
    },
    { id: 3, action: "Listing sold", item: "MacBook Air", time: "1 day ago" },
    {
      id: 4,
      action: "New review received",
      item: "5 stars",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-blue-100">
              Here's what's happening with your listings today.
            </p>
          </div>
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        from last month
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <Tabs value={timeRange} onValueChange={setTimeRange}>
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gray-100">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{activity.action}</div>
                      <div className="text-sm text-gray-600">
                        {activity.item}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4">
              View all activities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const MyListings = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: listings, isLoading } = useQuery({
    queryKey: ["my-listings", user?.id],
    queryFn: () => listingService.getUserListings(user!.id),
    enabled: !!user,
  });

  const filteredListings = listings?.filter((listing) => {
    if (statusFilter === "all") return true;
    return listing.status === statusFilter;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Listings</h2>
          <p className="text-gray-600">Manage your buy and sell listings</p>
        </div>
        <Button asChild>
          <a href="/sell">+ Create New Listing</a>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
        >
          All ({listings?.length || 0})
        </Button>
        <Button
          variant={statusFilter === "active" ? "default" : "outline"}
          onClick={() => setStatusFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={statusFilter === "sold" ? "default" : "outline"}
          onClick={() => setStatusFilter("sold")}
        >
          Sold
        </Button>
        <Button
          variant={statusFilter === "expired" ? "default" : "outline"}
          onClick={() => setStatusFilter("expired")}
        >
          Expired
        </Button>
      </div>

      {/* Listings Grid */}
      {filteredListings?.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No listings found</h3>
          <p className="text-gray-600 mb-6">
            Create your first listing to start selling
          </p>
          <Button asChild>
            <a href="/sell">Create Listing</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings?.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

const Favorites = () => {
  const [activeTab, setActiveTab] = useState("listings");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Favorites</h2>
        <p className="text-gray-600">Your saved listings and searches</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="listings">Saved Listings</TabsTrigger>
          <TabsTrigger value="searches">Saved Searches</TabsTrigger>
        </TabsList>
        <TabsContent value="listings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Display favorite listings here */}
            <div className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
              <p className="text-gray-600">
                Start browsing and save listings you like
              </p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="searches" className="mt-6">
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">iPhone 13 Pro</div>
                  <div className="text-sm text-gray-600">
                    Mumbai, Maharashtra
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Search Again
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const chats = [
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Is this still available?",
      time: "2 min ago",
      unread: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      lastMessage: "Can you deliver?",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: "3",
      name: "Robert Johnson",
      lastMessage: "What is the best price?",
      time: "2 days ago",
      unread: true,
    },
  ];

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex h-full border rounded-lg">
        {/* Chat List */}
        <div className="w-80 border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <div className="overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedChat === chat.id ? "bg-blue-50" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{chat.name}</div>
                  {chat.unread && <Badge className="bg-primary">New</Badge>}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {chat.lastMessage}
                </div>
                <div className="text-xs text-gray-500 mt-1">{chat.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="font-bold">John Doe</div>
                    <div className="text-sm text-gray-600">Active now</div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Listing
                </Button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Messages will be displayed here */}
                <div className="text-center py-12 text-gray-500">
                  Select a conversation to start chatting
                </div>
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-2"
                  />
                  <Button>Send</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 m-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{user?.name}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-green-600">
                      Verified
                    </Badge>
                    <Badge variant="outline">Member since 2023</Badge>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue={user?.phone}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">{user?.email}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium">
                    {user?.phone || "Not provided"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Member Since</div>
                  <div className="font-medium">
                    {user
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="font-medium">
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="p-6">
            <h4 className="font-bold text-lg mb-4">Account Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-400" />
                  <span>Active Listings</span>
                </div>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-gray-400" />
                  <span>Items Sold</span>
                </div>
                <span className="font-bold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>Followers</span>
                </div>
                <span className="font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span>Total Earnings</span>
                </div>
                <span className="font-bold">₹45,320</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showOnline: true,
    allowMessages: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-gray-600">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardContent className="p-6">
            <h4 className="font-bold text-lg mb-4">Notifications</h4>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium capitalize">{key}</div>
                    <div className="text-sm text-gray-600">
                      {key === "email" && "Receive email notifications"}
                      {key === "push" && "Receive push notifications"}
                      {key === "marketing" && "Receive marketing emails"}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setNotifications((prev) => ({
                          ...prev,
                          [key]: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardContent className="p-6">
            <h4 className="font-bold text-lg mb-4">Privacy</h4>
            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {key === "profilePublic" && "Public Profile"}
                      {key === "showOnline" && "Show Online Status"}
                      {key === "allowMessages" && "Allow Messages"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === "profilePublic" &&
                        "Allow others to see your profile"}
                      {key === "showOnline" && "Show when you are online"}
                      {key === "allowMessages" && "Allow others to message you"}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) =>
                        setPrivacy((prev) => ({
                          ...prev,
                          [key]: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h4 className="font-bold text-lg mb-4">Account Security</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Change Password</div>
                  <div className="text-sm text-gray-600">
                    Update your password regularly
                  </div>
                </div>
                <Button variant="outline">Change</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-600">
                    Add extra security to your account
                  </div>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Connected Devices</div>
                  <div className="text-sm text-gray-600">
                    Manage devices logged into your account
                  </div>
                </div>
                <Button variant="outline">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="listings" element={<MyListings />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="messages" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardPage;

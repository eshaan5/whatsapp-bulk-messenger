import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  QrCode,
  Upload,
  Send,
  FileSpreadsheet,
  MessageCircle,
  Menu,
} from "lucide-react";

const App: React.FC = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const numbers = text
          .split(/[\n,]+/)
          .map((num) => num.trim())
          .filter(Boolean);
        setPhoneNumbers(numbers.join(", "));
      };
      reader.readAsText(file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSendMessage = () => {
    if (!phoneNumbers || !message) {
      alert("Please enter phone numbers and message");
      return;
    }

    const payload = {
      phoneNumbers: phoneNumbers.split(",").map((num) => num.trim()),
      message,
      image: image,
    };

    console.log("Sending payload:", payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FFFAF0] to-[#FAF0E6] w-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-warmGray-600 mr-2" />
              <span className="text-xl font-bold text-warmGray-800">
                WhatsApp Bulk Messenger
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center pt-16 pb-8 min-w-screen mt-12">
        <Card className="w-8/12 mx-4 shadow-2xl border-none bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-warmGray-800">Send Bulk Messages</span>
              <Button variant="outline" size="icon">
                <QrCode className="h-5 w-5 text-warmGray-600" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="csv">Import CSV</TabsTrigger>
              </TabsList>

              <TabsContent value="manual">
                <Input
                  placeholder="Enter phone numbers (comma-separated)"
                  value={phoneNumbers}
                  onChange={(e) => setPhoneNumbers(e.target.value)}
                  className="mb-4"
                />
              </TabsContent>

              <TabsContent value="csv">
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileSpreadsheet className="mr-2 h-4 w-4" /> Import CSV
                  </Button>
                </div>
              </TabsContent>

              <Textarea
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-4 min-h-[120px]"
              />

              <div className="flex items-center space-x-2 mb-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                {image && (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                )}
              </div>

              <Button onClick={handleSendMessage} className="w-full">
                <Send className="mr-2 h-4 w-4" /> Send Bulk Message
              </Button>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* Footer */}
      <footer className="bg-warmGray-800 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1">
          <p>Created with ❤️ by</p>
          <a
            href="https://eshaan.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            Eshaan Bagga
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;

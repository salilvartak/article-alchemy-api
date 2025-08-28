import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, BarChart3, ImageIcon } from 'lucide-react';
import { ArticleProcessor } from '@/components/ArticleProcessor';
import { TrendReportGenerator } from '@/components/TrendReportGenerator';
import { ImageGenerator } from '@/components/ImageGenerator';
import heroImage from '@/assets/hero-dashboard.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI Content Processing Dashboard" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        </div>
        <div className="relative px-4 py-20 mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow">
              <FileText className="mr-2 h-4 w-4" />
              Article Content API Dashboard
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Process Articles
              <br />
              <span className="text-foreground">with AI Power</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Extract, analyze, and generate insights from web content using advanced AI processing.
              Transform articles into actionable intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-20 mx-auto max-w-7xl">
        <Card className="relative overflow-hidden shadow-card">
          <div className="absolute inset-0 bg-gradient-card opacity-20" />
          <CardContent className="relative p-6">
            <Tabs defaultValue="process" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-muted/30">
                <TabsTrigger 
                  value="process" 
                  className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Process Article</span>
                  <span className="sm:hidden">Process</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Trend Report</span>
                  <span className="sm:hidden">Trends</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="images" 
                  className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Generate Image</span>
                  <span className="sm:hidden">Images</span>
                </TabsTrigger>
              </TabsList>

              <div className="animate-in fade-in-0 duration-500">
                <TabsContent value="process" className="space-y-6 mt-0">
                  <ArticleProcessor />
                </TabsContent>

                <TabsContent value="trends" className="space-y-6 mt-0">
                  <TrendReportGenerator />
                </TabsContent>

                <TabsContent value="images" className="space-y-6 mt-0">
                  <ImageGenerator />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* API Info Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-xl bg-muted/30 border text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Ready to integrate with your FastAPI backend
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
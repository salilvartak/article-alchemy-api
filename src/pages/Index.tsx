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
      {/* Professional Header */}
      <header className="border-b border-border bg-card">
        <div className="px-6 py-8 mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary/5 border border-primary/10">
              <FileText className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Article Content API</span>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading font-semibold text-foreground tracking-tight">
                Professional Content Processing Platform
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                Extract, analyze, and generate insights from web content using advanced AI processing capabilities. 
                Transform articles into actionable business intelligence with enterprise-grade reliability.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Application */}
      <main className="px-6 py-12 mx-auto max-w-7xl">
        <Card className="shadow-moderate border-border">
          <CardContent className="p-8">
            <Tabs defaultValue="process" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 bg-secondary p-1">
                <TabsTrigger 
                  value="process" 
                  className="flex items-center gap-2 transition-micro data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-subtle"
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">Process Article</span>
                  <span className="sm:hidden font-medium">Process</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="trends" 
                  className="flex items-center gap-2 transition-micro data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-subtle"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">Trend Analysis</span>
                  <span className="sm:hidden font-medium">Trends</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="images" 
                  className="flex items-center gap-2 transition-micro data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-subtle"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">Image Generation</span>
                  <span className="sm:hidden font-medium">Images</span>
                </TabsTrigger>
              </TabsList>

              <div className="animate-in fade-in-0 duration-300">
                <TabsContent value="process" className="mt-0">
                  <ArticleProcessor />
                </TabsContent>

                <TabsContent value="trends" className="mt-0">
                  <TrendReportGenerator />
                </TabsContent>

                <TabsContent value="images" className="mt-0">
                  <ImageGenerator />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Status Footer */}
        <footer className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-lg bg-secondary text-sm text-secondary-foreground border border-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="font-medium">Ready for FastAPI Integration</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Link, FileText, Image, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ArticleResult {
  url: string;
  title: string;
  content: string;
  images: string[];
  categories: { [key: string]: number };
  ai_content: {
    summary: string;
    key_takeaways: string[];
    social_snippet: string;
  };
}

export const ArticleProcessor = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ArticleResult | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock response with corrected takeaways property name
      const mockResult: ArticleResult = {
        url,
        title: "Revolutionary AI Breakthrough Changes Everything",
        content: "In a groundbreaking development that could reshape the future of artificial intelligence, researchers have announced a new paradigm that promises to revolutionize how we interact with technology. This breakthrough represents years of research and innovation, combining advanced machine learning techniques with novel computational approaches to create systems that can understand and respond to human needs with unprecedented accuracy and efficiency.",
        images: [
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400",
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400"
        ],
        categories: {
          "Technology": 0.95,
          "AI & Machine Learning": 0.87,
          "Innovation": 0.72,
          "Research": 0.68
        },
        ai_content: {
          summary: "A major AI breakthrough has been announced that could transform technology interaction paradigms and reshape future development across multiple industries.",
          key_takeaways: [
            "Revolutionary AI paradigm combining multiple advanced techniques",
            "Unprecedented accuracy in human-computer interaction achieved",
            "Years of interdisciplinary research culminated in breakthrough",
            "Industry-wide implications for future technology development",
            "Novel computational approaches enabling new possibilities"
          ],
          social_snippet: "🚀 BREAKING: Revolutionary AI breakthrough announced! This paradigm shift could transform how we interact with technology across all industries. The future is here! #AI #Innovation #TechNews #Breakthrough"
        }
      };
      
      setResult(mockResult);
      toast({
        title: "Article processed successfully!",
        description: "Content extracted and analyzed with AI insights."
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Please try again with a valid URL.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border-border shadow-subtle">
        <CardHeader className="pb-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-heading">Article Content Processor</CardTitle>
              <CardDescription className="text-muted-foreground">
                Extract and analyze content from web articles with AI-powered insights
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Article URL</label>
              <Input
                type="url"
                placeholder="https://example.com/article-to-analyze"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="transition-micro focus:ring-2 focus:ring-primary focus:border-primary"
                disabled={loading}
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading || !url}
              className="w-full transition-micro hover:shadow-subtle"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Article...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Process Article
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-border shadow-subtle">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <CardTitle className="text-xl font-heading">Processing Results</CardTitle>
              <CardDescription>
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline transition-micro font-medium"
                >
                  {result.url}
                </a>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-medium mb-3 text-foreground">Article Title</h3>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <p className="text-sm font-medium">{result.title}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading font-medium mb-3 text-foreground">Content Preview</h3>
                  <div className="bg-secondary p-4 rounded-lg border border-border max-h-32 overflow-y-auto">
                    <p className="text-sm leading-relaxed text-secondary-foreground">
                      {result.content.substring(0, 300)}...
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading font-medium mb-3 text-foreground">Content Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(result.categories).map(([category, confidence]) => (
                      <Badge key={category} variant="secondary" className="transition-micro hover:bg-primary hover:text-primary-foreground">
                        {category}: {Math.round(confidence as number * 100)}%
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-medium mb-3 text-foreground">AI-Generated Summary</h3>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <p className="text-sm leading-relaxed text-secondary-foreground">{result.ai_content.summary}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading font-medium mb-3 text-foreground">Key Insights</h3>
                  <div className="space-y-2">
                    {result.ai_content.key_takeaways.map((takeaway: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">{takeaway}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-heading font-medium mb-3 text-foreground">Social Media Preview</h3>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <p className="text-sm text-secondary-foreground">{result.ai_content.social_snippet}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {result.images.length > 0 && (
              <div>
                <h3 className="font-heading font-medium mb-4 text-foreground">
                  Article Images ({result.images.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {result.images.slice(0, 8).map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Article image ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border border-border transition-micro group-hover:shadow-subtle"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, BarChart3, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Article {
  title: string;
  url: string;
}

interface TrendReportResult {
  category: string;
  report: string;
}

export const TrendReportGenerator = () => {
  const [category, setCategory] = useState('');
  const [articles, setArticles] = useState<Article[]>([{ title: '', url: '' }]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrendReportResult | null>(null);
  const { toast } = useToast();

  const addArticle = () => {
    setArticles([...articles, { title: '', url: '' }]);
  };

  const removeArticle = (index: number) => {
    if (articles.length > 1) {
      setArticles(articles.filter((_, i) => i !== index));
    }
  };

  const updateArticle = (index: number, field: 'title' | 'url', value: string) => {
    const updated = articles.map((article, i) => 
      i === index ? { ...article, [field]: value } : article
    );
    setArticles(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim() || articles.some(a => !a.title.trim() || !a.url.trim())) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before generating the report.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Mock response
      const mockResult: TrendReportResult = {
        category,
        report: `# ${category} Trend Report

## Executive Summary
Based on the analysis of ${articles.length} articles in the ${category} sector, several key trends are emerging that will shape the industry landscape in the coming months.

## Key Findings

### 1. Market Evolution
The ${category} market is experiencing unprecedented growth, with innovation driving significant changes in consumer behavior and industry standards.

### 2. Technology Integration
Artificial intelligence and automation are becoming central themes, with companies increasingly adopting smart technologies to enhance efficiency and user experience.

### 3. Sustainability Focus
Environmental consciousness is reshaping product development and corporate strategies across the ${category} sector.

## Emerging Trends

- **Digital Transformation**: Companies are accelerating their digital initiatives
- **Consumer-Centric Approach**: User experience is becoming the primary differentiator
- **Data-Driven Decisions**: Analytics and insights are driving strategic planning
- **Collaborative Innovation**: Cross-industry partnerships are fostering breakthrough solutions

## Market Impact Analysis
The convergence of these trends suggests a fundamental shift in how ${category} companies operate and compete. Organizations that adapt quickly to these changes are positioned for long-term success.

## Recommendations
1. Invest in emerging technologies
2. Prioritize sustainability initiatives  
3. Enhance customer experience platforms
4. Develop agile business models
5. Foster innovation partnerships

## Conclusion
The ${category} industry stands at an inflection point. Companies that embrace these trends will lead the next wave of innovation and market growth.`
      };
      
      setResult(mockResult);
      toast({
        title: "Trend report generated!",
        description: `Analysis complete for ${category} category.`
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-card opacity-50" />
        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>Trend Report Generator</CardTitle>
              <CardDescription>
                Synthesize multiple articles to generate comprehensive trend analysis
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Input
                placeholder="e.g., Technology, Finance, Healthcare"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="transition-all duration-300 focus:shadow-glow"
                disabled={loading}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Articles</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addArticle}
                  disabled={loading}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Article
                </Button>
              </div>
              
              {articles.map((article, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 rounded-lg bg-muted/30 border">
                  <Input
                    placeholder="Article title"
                    value={article.title}
                    onChange={(e) => updateArticle(index, 'title', e.target.value)}
                    disabled={loading}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Article URL"
                      value={article.url}
                      onChange={(e) => updateArticle(index, 'url', e.target.value)}
                      disabled={loading}
                      className="flex-1"
                    />
                    {articles.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArticle(index)}
                        disabled={loading}
                        className="px-2"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Trend Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-card opacity-30" />
          <CardHeader className="relative">
            <CardTitle>{result.category} Trend Report</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="bg-muted/30 rounded-lg p-6 border">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-mono">
                {result.report}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};